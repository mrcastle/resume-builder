import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createResume from "app/resumes/mutations/createResume";
import {
  ResumeForm,
  FORM_ERROR,
} from "app/resumes/components/ResumeForm/ResumeForm";

const NewResumePage = () => {
  const router = useRouter();
  const [createResumeMutation] = useMutation(createResume);

  return (
    <Layout title={"Create New Resume"}>
      <h1>Create New Resume</h1>

      <ResumeForm
        submitText="Create Resume"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateResume}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const resume = await createResumeMutation(values);
            void router.push(Routes.ShowResumePage({ resumeId: resume.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.ResumesPage()}>
          <a>Resumes</a>
        </Link>
      </p>
    </Layout>
  );
};

NewResumePage.authenticate = true;

export default NewResumePage;
