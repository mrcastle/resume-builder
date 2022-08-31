import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getResume from "app/resumes/queries/getResume";
import deleteResume from "app/resumes/mutations/deleteResume";

export const Resume = () => {
  const router = useRouter();
  const resumeId = useParam("resumeId", "number");
  const [deleteResumeMutation] = useMutation(deleteResume);
  const [resume] = useQuery(getResume, { id: resumeId });

  return (
    <>
      <Head>
        <title>Resume {resume.id}</title>
      </Head>

      <div>
        <h1>Resume {resume.id}</h1>
        <pre>{JSON.stringify(resume, null, 2)}</pre>

        <Link href={Routes.EditResumePage({ resumeId: resume.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteResumeMutation({ id: resume.id });
              router.push(Routes.ResumesPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowResumePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ResumesPage()}>
          <a>Resumes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Resume />
      </Suspense>
    </div>
  );
};

ShowResumePage.authenticate = true;
ShowResumePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowResumePage;
