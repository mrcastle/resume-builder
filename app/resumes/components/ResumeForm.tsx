import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { useState, ChangeEvent, useEffect } from "react";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useField } from "formik";

function TechnicalSkill({
  skill,
  handleDeleteSkill,
  categoryIndex,
  skillIndex,
}) {
  const handleOnDeleteClick = () => {
    handleDeleteSkill(skillIndex);
  };

  return (
    <Chip
      key={`technicalCategories.${categoryIndex}.skills.${skillIndex}-chip`}
      label={skill}
      onDelete={handleOnDeleteClick}
    />
  );
}

function TechnicalCategoryFields({ index }) {
  const handleAddSkill = () => {
    setValue([...skills, skillInput]);
  };

  const handleDeleteSkill = (skillIndex) => {
    setValue(skills.filter((_, idx) => idx !== skillIndex));
  };

  const [_field, meta, helpers] = useField(
    `technicalCategories.${index}.skills`
  );

  const { value: skills } = meta;
  const { setValue } = helpers;

  const [skillInput, setSkillInput] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(event.target.value);
  };

  return (
    <>
      <LabeledTextField
        name={`technicalCategories.${index}.name`}
        label="Category"
      />

      {skills?.map((skill, skillIndex) => {
        return (
          <TechnicalSkill
            key={`technicalCategories.${index}.skills.${skillIndex}-chip`}
            skill={skill}
            handleDeleteSkill={handleDeleteSkill}
            categoryIndex={index}
            skillIndex={skillIndex}
          />
        );
      })}
      <TextField
        id="add-skill"
        label="Add Skill"
        value={skillInput}
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleAddSkill}>
        Add skill
      </Button>
    </>
  );
}

export function ResumeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [categories, setCategories] = useState(
    props.initialValues?.technicalCategories ?? []
  );
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField
        name="userDisplayName"
        label="Full Name"
        placeholder="Full Name"
      />

      {categories?.map((_, index) => {
        return (
          <TechnicalCategoryFields
            key={`tech-category-${index}`}
            index={index}
          />
        );
      })}
    </Form>
  );
}
