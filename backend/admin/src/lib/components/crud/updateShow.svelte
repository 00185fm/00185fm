<script lang="ts">
  import Form from "$lib/forms/form.svelte";
  import Input from "$lib/forms/input.svelte";
  import SubmitButton from "$lib/forms/submitButton.svelte";
  import type { RecordModel } from "pocketbase";
  import { superForm } from "sveltekit-superforms/client";
  import { updateShow } from "$lib/components/crud/schema";
  export let form;
  export let show: RecordModel;
  export let updateForm: boolean = true;
  let openEditor: boolean = false;
  const u_superform = superForm(form, {
    taintedMessage: null,
    validators: updateShow,
    onResult({ result }) {
      if (result.type === "success") {
        updateForm = false;
      }
    },
    onError({ result, message }) {
      console.log(result.error.message);
      message.set(result.error.message);
    },
  });
</script>

<div class="card mb-5 p-10 variant-ringed">
  <div class="flex justify-between pb-5">
    <h2 class="h2">Update Show</h2>
    <button
      class="btn-icon variant-filled"
      on:click={() => (updateForm = false)}>✕</button
    >
  </div>
  <Form superform={u_superform} showRequiredIndicator={false} action="?/update">
    <Input type="hidden" field="id" data={show.id} />
    <Input
      info="You have to know that changing 'Title' the show url will <span class='text-red-500 font-bold text-xl'>NOT</span> update. <p class='p-2'>URL = 'https://00185fm.eu/shows/{show.slug}'</p>"
      type="text"
      field="title"
      data={show.title}
    />
    <Input
      info="This should be the curator name. Feel free to use a generic name (like 'GUESTS'), you will be able to choose a specific 'Author' for each episode."
      type="text"
      field="author"
      data={show.author}
    />
    <Input
      info="<p>Use any <a href='https://00185fm.github.io/tw-editor/' target='_blank' style='text-shadow: rgb(255, 253, 0) 9px 3px 5px;' class='text-secondary-700 font-bold text-xl'>rich text to html editor</a> to customize the description styling (<a href='https://wordtohtml.net/' target='_blank' class='btn-icon btn-icon-sm variant-filled-primary'>👁</a>). Then activate the 'Editor' and copy&paste the result in the box.</p> <p class='text-sm text-red-500'>Images are not allowed yet.</p>"
      placeholder="Write here than make the 'Editor' inactive to proceed"
      required={false}
      bind:openEditor
      type="textarea"
      field="description"
      data={show.description}
    />

    <SubmitButton disabled={openEditor} field="Update Show" />
  </Form>
</div>
