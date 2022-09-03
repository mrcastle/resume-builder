import { useField } from "formik";
import { useState, ChangeEvent, useEffect } from "react";
import { z } from "zod";

export { FORM_ERROR } from "app/core/components/Form";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";

import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";

import styles from "./ResumeForm.module.scss";

function TechnicalSkills({ skills, handleDeleteSkill, categoryIndex }) {
  return (
    <div className={styles.Skills}>
      {skills?.map((skill, skillIndex) => {
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
      })}
    </div>
  );
}

function TechnicalCategoryFields({ index }) {
  const handleAddSkill = () => {
    const skillsToSet = skills ? [...skills, skillInput] : [skillInput];
    setValue(skillsToSet);
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

  useEffect(() => {
    setSkillInput("");
  }, [skills]);

  return (
    <Paper className={styles.Category}>
      <LabeledTextField
        name={`technicalCategories.${index}.name`}
        label="Category"
      />

      <TechnicalSkills
        key={`technicalCategories.${index}.skills`}
        skills={skills}
        handleDeleteSkill={handleDeleteSkill}
        categoryIndex={index}
      />
      <TextField
        fullWidth
        id="add-skill"
        label="Add Skill"
        value={skillInput}
        onChange={handleChange}
        multiline
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
      <Button variant="contained" onClick={handleAddSkill}>
        Add skill
      </Button>
    </Paper>
  );
}

export function ResumeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [categories, setCategories] = useState(
    props.initialValues?.technicalCategories ?? []
  );

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", skills: [] }]);
  };

  return (
    <Form<S> {...props} className={styles.Wrapper}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField
        name="userDisplayName"
        label="Full Name"
        placeholder="Full Name"
      />
      <div className={styles.TechnicalSkills}>
        <Typography className={styles.SectionHeader} variant="h6">
          Technical Skills
        </Typography>
        {categories?.map((_, index) => {
          return (
            <TechnicalCategoryFields
              key={`tech-category-${index}`}
              index={index}
            />
          );
        })}
        <Button variant="contained" onClick={handleAddCategory}>
          Add Technical Skill Category
        </Button>
      </div>
    </Form>
  );
}
