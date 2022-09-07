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

import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";

import styles from "./TechnicalSkillsSection.module.scss";

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

function TechnicalCategoryFields({ index, handleDeleteCategory }) {
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

      <IconButton onClick={handleDeleteCategory} aria-label="delete">
        <DeleteIcon />
      </IconButton>

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

export function TechnicalSkillsSection({}) {
  const [_field, meta, helpers] = useField("technicalCategories");

  const { value: categories } = meta;
  const { setValue } = helpers;

  const handleAddCategory = () => {
    setValue([...categories, { name: "", skills: [] }]);
  };
  return (
    <div className={styles.Wrapper}>
      <Typography className={styles.SectionHeader} variant="h6">
        Technical Skills
      </Typography>
      {categories?.map((_, index) => {
        const handleDeleteCategory = () => {
          setValue(categories.filter((_, idx) => idx !== index));
        };

        return (
          <TechnicalCategoryFields
            key={`tech-category-${index}`}
            index={index}
            handleDeleteCategory={handleDeleteCategory}
          />
        );
      })}
      <Button variant="contained" onClick={handleAddCategory}>
        Add Technical Skill Category
      </Button>
    </div>
  );
}

export default TechnicalSkillsSection;
