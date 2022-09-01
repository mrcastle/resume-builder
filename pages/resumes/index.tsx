import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getResumes from "app/resumes/queries/getResumes";

const ITEMS_PER_PAGE = 100;

export const ResumesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ resumes, hasMore }] = usePaginatedQuery(getResumes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            <Link href={Routes.ShowResumePage({ resumeId: resume.id })}>
              <a>{resume.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ResumesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Resumes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewResumePage()}>
            <a>Create Resume</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ResumesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ResumesPage;
