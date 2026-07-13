import type {Experience,Goal,Ownership,Priority,StrategyId} from "@/types/decision";
export const strategyLabels:Record<StrategyId,string>={diy:"DIY",hybrid:"Hybrid approach",professional:"Professional installation",delay:"Wait and plan"};
export const questions={
 goal:{eyebrow:"Your outcome",title:"What are you hoping this project accomplishes?",helper:"The same backsplash project can call for a different strategy depending on why you are doing it.",options:[
  {value:"appearance" satisfies Goal,title:"Create a kitchen we love",description:"The finished look and personal style matter most."},
  {value:"resale" satisfies Goal,title:"Increase resale appeal",description:"Improve the kitchen before selling or refinancing."},
  {value:"damage" satisfies Goal,title:"Replace damaged material",description:"Fix deterioration, loose tile, or a problem area."},
  {value:"functionality" satisfies Goal,title:"Make the kitchen easier to use",description:"Improve cleaning, durability, or protection."}]},
 priority:{eyebrow:"Your priorities",title:"What matters most in this decision?",helper:"Choose the factor you would protect if every option required a tradeoff.",options:[
  {value:"cost" satisfies Priority,title:"Keep costs down",description:"Spend less without creating avoidable rework."},
  {value:"quality" satisfies Priority,title:"Get the best finished result",description:"Protect the look, alignment, and craftsmanship."},
  {value:"speed" satisfies Priority,title:"Finish quickly",description:"Reduce disruption and get the kitchen back fast."},
  {value:"risk" satisfies Priority,title:"Avoid costly mistakes",description:"Reduce the chance of damage or rework."},
  {value:"longTerm" satisfies Priority,title:"Maximize long-term value",description:"Choose the path that should age best over time."}]},
 experience:{eyebrow:"Your experience",title:"Have you installed tile before?",helper:"This changes which parts of the project are realistic for you.",options:[
  {value:"none" satisfies Experience,title:"Never",description:"This would be my first tile installation."},
  {value:"some" satisfies Experience,title:"Once or twice",description:"I understand the basics but expect a learning curve."},
  {value:"experienced" satisfies Experience,title:"Several projects",description:"I am comfortable with layout, cuts, adhesive, and grout."}]},
 ownership:{eyebrow:"Your horizon",title:"How long do you expect to own this home?",helper:"Your time horizon changes how much it makes sense to optimize for taste, durability, and resale.",options:[
  {value:"sellingSoon" satisfies Ownership,title:"Selling within 12 months",description:"Speed, broad appeal, and return on spend matter more."},
  {value:"mediumTerm" satisfies Ownership,title:"About 1–5 years",description:"Balance enjoyment today with future resale."},
  {value:"longTerm" satisfies Ownership,title:"Long-term",description:"We want to enjoy and live with this choice for years."}]}
} as const;
