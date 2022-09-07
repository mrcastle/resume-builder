import { useField } from "formik";
import { useState, ChangeEvent, useEffect, Suspense } from "react";
import { z } from "zod";

export { FORM_ERROR } from "app/core/components/Form";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
//import MUIRichTextEditor from "mui-rte";

import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";

import dynamic from "next/dynamic";

const MUIRichTextEditorNoSSR = dynamic(() => import("mui-rte"), {
  loading: () => (
    <Stack>
      <Skeleton height={40} width={200} /> <Skeleton />
    </Stack>
  ),
  ssr: false,
});

import "draft-js/dist/Draft.css";

import styles from "./ResumeForm.module.scss";
import TechnicalSkillsSection from "./TechnicalSkillsSection/TechnicalSkillsSection";

function SummaryField({}) {
  const [_field, meta, helpers] = useField("technicalCategories");

  const { value } = meta;
  const { setValue } = helpers;

  const [summary, setSummary] = useState();

  useEffect(() => {
    console.log("summary", summary);
  }, [summary]);

  return <MUIRichTextEditorNoSSR label="Summary" />;
}

export function ResumeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  // const [categories, setCategories] = useState(
  //   props.initialValues?.technicalCategories ?? []
  // );

  return (
    <Form<S> {...props} className={styles.Wrapper}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField
        name="userDisplayName"
        label="Full Name"
        placeholder="Full Name"
      />
      <SummaryField />

      <TechnicalSkillsSection />
    </Form>
  );
}
