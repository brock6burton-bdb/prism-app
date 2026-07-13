"use client";

import { useState } from "react";
import { questions } from "@/data/backsplash";
import { evaluateBacksplash } from "@/lib/strategyEngine";
import type {
  DecisionAnswers,
  Experience,
  Goal,
  Ownership,
  Priority,
} from "@/types/decision";
import { ChoiceCard } from "./ChoiceCard";
import { DecisionResultView } from "./DecisionResultView";
import { PrismMark } from "./PrismMark";

type QuestionKey = "goal" | "priority" | "experience" | "ownership";
type AnswerValue = Goal | Priority | Experience | Ownership;

const questionOrder: QuestionKey[] = [
  "goal",
  "priority",
  "experience",
  "ownership",
];

export function DecisionFlow() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DecisionAnswers>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questionOrder[questionIndex];
  const selectedValue = answers[currentQuestion];
  const progress = started
    ? Math.round(((questionIndex + 1) / questionOrder.length) * 100)
    : 0;

  function selectAnswer(value: AnswerValue) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: value,
    }));
  }

  function continueFlow() {
    if (!selectedValue) return;

    if (questionIndex < questionOrder.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      return;
    }

    setIsEvaluating(true);
    window.setTimeout(() => {
      setIsEvaluating(false);
      setIsComplete(true);
    }, 1400);
  }

  function goBack() {
    if (questionIndex === 0) {
      setStarted(false);
      return;
    }
    setQuestionIndex((previous) => previous - 1);
  }

  function restart() {
    setStarted(false);
    setQuestionIndex(0);
    setAnswers({});
    setIsEvaluating(false);
    setIsComplete(false);
  }

  if (isComplete) {
    const result = evaluateBacksplash(
      answers as Required<DecisionAnswers>,
    );

    return (
      <div className="appShell">
        <AppHeader />
        <DecisionResultView result={result} onRestart={restart} />
      </div>
    );
  }

  if (isEvaluating) {
    return (
      <div className="appShell">
        <AppHeader />
        <main className="evaluationPage">
          <div className="evaluationOrb" aria-hidden="true">
            <span />
          </div>
          <span className="eyebrow">Prism Decision Engine</span>
          <h1>Building your strategy...</h1>
          <div className="evaluationList">
            <p className="done">Understanding your outcome</p>
            <p className="done">Weighing your priorities</p>
            <p className="done">Evaluating DIY feasibility</p>
            <p className="active">Comparing viable strategies</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="appShell">
      <AppHeader />

      <main className="flowMain">
        {started ? (
          <>
            <div className="progressBlock">
              <div className="progressCopy">
                <span>Building clarity</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progressTrack">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <QuestionScreen
              questionKey={currentQuestion}
              selectedValue={selectedValue}
              onSelect={selectAnswer}
            />

            <div className="flowActions">
              <button className="textButton" type="button" onClick={goBack}>
                Back
              </button>

              <button
                className="primaryButton"
                type="button"
                onClick={continueFlow}
                disabled={!selectedValue}
              >
                {questionIndex === questionOrder.length - 1
                  ? "Build my strategy"
                  : "Continue"}
              </button>
            </div>
          </>
        ) : (
          <IntroScreen onStart={() => setStarted(true)} />
        )}
      </main>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="introCard">
      <div className="introGlow" aria-hidden="true" />

      <div className="introBody">
        <span className="eyebrow">Kitchen backsplash decision</span>
        <p className="introProblem">
          Home projects get expensive fast when the path is unclear.
        </p>
        <h1>Let&apos;s build your decision strategy.</h1>
        <p className="introLead">
          Understand the smartest path for your situation—and why the other
          options rank lower.
        </p>

        <div className="proofGrid">
          <div>
            <strong>≈2 min</strong>
            <span>to complete</span>
          </div>
          <div>
            <strong>4 adaptive</strong>
            <span>questions</span>
          </div>
          <div>
            <strong>Independent</strong>
            <span>guidance</span>
          </div>
        </div>

        <div className="trustStatement">
          <span aria-hidden="true">✓</span>
          <p>
            Built to recommend what fits you—not what is most profitable for
            someone else.
          </p>
        </div>
      </div>

      <div className="introFooter">
        <div>
          <strong>Clarity before commitment.</strong>
          <span>No lead forms. No contractor pressure.</span>
        </div>

        <button className="primaryButton" type="button" onClick={onStart}>
          Start my decision →
        </button>
      </div>
    </section>
  );
}

function QuestionScreen({
  questionKey,
  selectedValue,
  onSelect,
}: {
  questionKey: QuestionKey;
  selectedValue: AnswerValue | undefined;
  onSelect: (value: AnswerValue) => void;
}) {
  const question = questions[questionKey];

  return (
    <section className="questionPanel">
      <span className="eyebrow">{question.eyebrow}</span>
      <h1>{question.title}</h1>
      <p>{question.helper}</p>

      <div className="choiceGrid">
        {question.options.map((option) => (
          <ChoiceCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>

      {selectedValue ? (
        <p className="acknowledgement">
          That helps. This answer changes how Prism compares the available
          strategies.
        </p>
      ) : null}
    </section>
  );
}

function AppHeader() {
  return (
    <header className="appHeader">
      <a href="/" className="brand">
        <PrismMark />
        <span>
          <strong>PRISM</strong>
          <small>Clarity before commitment.</small>
        </span>
      </a>

      <div className="headerProject">
        <span>Current decision</span>
        <strong>Kitchen backsplash</strong>
      </div>
    </header>
  );
}
