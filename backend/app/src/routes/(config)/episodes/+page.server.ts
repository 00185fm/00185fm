import { pb } from "$lib/pocketbase";
import { Collections } from "$lib/pocketbase/types";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ locals }) => {
  if (!locals?.user) throw redirect(302, "/login");
  try {
    const episodes = structuredClone(
      await pb
        .collection(Collections.Episodes)
        .getFullList({ sort: "-date", expand: "show" })
    );
    return { episodes };
  } catch (error) {
    console.log(error);
  }
};
