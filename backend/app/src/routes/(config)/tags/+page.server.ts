import { pb } from "$lib/pocketbase";
import { Collections } from "$lib/pocketbase/types";
import { redirect, type Actions, fail, type ServerLoad } from "@sveltejs/kit";
import { newTag } from "./schema";
import { superValidate } from "sveltekit-superforms/server";
import { serializeNonPOJOs, slugify } from "$lib/server/utility";

export const load: ServerLoad = async ({ locals }) => {
  if (!locals?.user) throw redirect(302, "/login");
  const form = await superValidate(newTag);
  const records = await pb.collection(Collections.Tags).getFullList({
    sort: "-tag",
  });
  return {
    tags: serializeNonPOJOs(records),
    form,
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const form = await superValidate(data, newTag);
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const tag = {
        tag: slugify(form.data.tag),
      };

      await pb.collection(Collections.Tags).create(tag);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async ({ url }) => {
    try {
      const data = url.searchParams;
      const id = data.get("id") || "";
      await pb.collection(Collections.Tags).delete(id);
    } catch (error) {
      console.log(error);
    }
  },
};
