import { Suspense } from "react";
import { Routes } from "@blitzjs/next";

import getResume from "app/resumes/queries/getResume";
import updateResume from "app/resumes/mutations/updateResume";

import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Head from "next/head";
import Link from "next/link";

import Layout from "app/core/layouts/Layout";

import { ResumeForm, FORM_ERROR } from "app/resumes/components/ResumeForm";

import styles from "./edit.module.scss";

export const EditResume = () => {
  const router = useRouter();
  const resumeId = useParam("resumeId", "number");
  const [resume, { setQueryData }] = useQuery(
    getResume,
    { id: resumeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateResumeMutation] = useMutation(updateResume);

  return (
    <>
      <Head>
        <title>Edit Resume {resume.id}</title>
      </Head>

      <div className={styles.Wrapper}>
        <h1>Edit Resume {resume.id}</h1>
        {/* <pre>{JSON.stringify(resume, null, 2)}</pre> */}

        <ResumeForm
          submitText="Update Resume"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateResume}
          initialValues={resume}
          onSubmit={async (values) => {
            try {
              const updated = await updateResumeMutation({
                id: resume.id,
                ...values,
              });
              await setQueryData(updated);
              void router.push(Routes.ShowResumePage({ resumeId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditResumePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditResume />
      </Suspense>

      <p>
        <Link href={Routes.ResumesPage()}>
          <a>Resumes</a>
        </Link>
      </p>
    </div>
  );
};

EditResumePage.authenticate = true;
EditResumePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditResumePage;
