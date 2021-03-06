import { ReactNode } from "react";

type ConditionRenderProps = {
  conditions: [boolean, ReactNode][];
  children: ReactNode;
};

function ConditionRender({ conditions, children }: ConditionRenderProps) {
  const conditionMatch = conditions.find(([value]) => value);

  return <>{conditionMatch?.[1] || children}</>;
}

export default ConditionRender;
