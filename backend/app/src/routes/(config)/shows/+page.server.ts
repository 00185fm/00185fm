import { redirect, type Actions, type ServerLoad, fail } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import { slugify, serializeNonPOJOs } from "$lib/server/utility";
import { newShow } from "$lib/components/crud/schema";
import { superValidate } from "sveltekit-superforms/server";
import type { RecordModel } from "pocketbase";

export const load: ServerLoad = async ({ locals }) => {
  if (!locals?.user) throw redirect(302, "/login");
  const form = await superValidate(newShow);
  const records: RecordModel[] = serializeNonPOJOs(
    await pb.collection("shows").getFullList({
      sort: "title",
    })
  );
  return {
    shows: records,
    form,
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const form = await superValidate(data, newShow);

    if (!form.valid) {
      return fail(400, { form });
    }
    const slug = slugify(form.data.title);
    try {
      data.append("slug", slug);
      await pb.collection("shows").create(data);
    } catch (error) {
      console.log(error);
      return fail(400, { error, form });
    }
    throw redirect(304, "/shows/" + slug);
  },
};
