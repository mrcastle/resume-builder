import { useField } from "formik";
import { useState } from "react";
import { z } from "zod";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";

export { FORM_ERROR } from "app/core/components/Form";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";

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

function SummaryField() {
  const [_field, meta, helpers] = useField("summary");

  const { initialValue } = meta;
  const { setValue } = helpers;

  const [_summary, setSummary] = useState(
    initialValue
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(initialValue)))
      : EditorState.createEmpty()
  );

  const handleChange = (editorState) => {
    const content = editorState.getCurrentContent();

    setValue(JSON.stringify(convertToRaw(content)));
    setSummary(editorState);
  };

  const controls = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "link",
    "numberList",
    "bulletList",
  ];

  return (
    <MUIRichTextEditorNoSSR
      label="Summary"
      defaultValue={initialValue ?? ""}
      onChange={handleChange}
      controls={controls}
    />
  );
}

export function ResumeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
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
