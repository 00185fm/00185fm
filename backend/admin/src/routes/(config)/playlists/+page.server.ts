import { pb } from "$lib/pocketbase";
import { Collections } from "$lib/pocketbase/types";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals?.user) throw redirect(302, "/login");
  const playlists = structuredClone(
    await pb.collection(Collections.Playlists).getFullList()
  );
  return { playlists };
};
