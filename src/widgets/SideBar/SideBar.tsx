import { FilterVacancies } from "../../features/FilterVacancies";
import { SkillsPills } from "../SkillsPills/SkillsPills";
import classes from "./SideBar.module.css";
import clsx from "clsx";

export const SideBar = () => {
  return (
    <aside className={classes.sidebar}>
      <section className={clsx(classes.block, classes["skills-block"])}>
        <SkillsPills />
      </section>

      <section className={clsx(classes.block, classes["city-block"])}>
        <FilterVacancies />
      </section>
    </aside>
  );
};
