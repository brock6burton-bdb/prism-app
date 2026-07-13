import type { DecisionResult } from "@/types/decision";

export function DecisionResultView({
  result,
  onRestart,
}: {
  result: DecisionResult;
  onRestart: () => void;
}) {
  const runnerUp = result.alternatives[0];

  return (
    <main className="resultPage">
      <section className="resultHero">
        <span className="resultKicker">Your decision strategy</span>

        <h1>{result.headline}</h1>

        <p>{result.summary}</p>

        <div className="strategyMeta">
          <div>
            <span>Strategy fit</span>
            <strong>{result.winner.score}/100</strong>
          </div>

          <div>
            <span>Next-best path</span>
            <strong>{runnerUp.label}</strong>
          </div>

          <div>
            <span>
              {result.estimatedSavings ? "Potential savings" : "Confidence"}
            </span>
            <strong>
              {result.estimatedSavings ?? "High confidence"}
            </strong>
          </div>
        </div>
      </section>

      <section className="resultGrid">
        <article className="resultCard resultCardWide">
          <span className="sectionLabel">
            Why this fits your situation
          </span>

          <div className="reasonStack">
            {result.reasons.map((reason, index) => (
              <div className="reasonRow" key={`${index}-${reason}`}>
                <span>{index + 1}</span>
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="resultCard">
          <span className="sectionLabel">
            Why the alternatives ranked lower
          </span>

          <div className="accordionStack">
            {result.whyNot.map((item) => (
              <details key={item.id}>
                <summary>{item.title}</summary>
                <p>{item.explanation}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="resultCard">
          <span className="sectionLabel">Your first three steps</span>

          <ol className="actionList">
            {result.actionPlan.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className="resultCard stopCard resultCardWide">
          <span className="sectionLabel">Know when to stop</span>

          <ul>
            {result.stopConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </article>
      </section>

      <div className="resultActions">
        <button
          className="secondaryButton"
          type="button"
          onClick={onRestart}
        >
          Start over
        </button>

        <button
          className="primaryButton"
          type="button"
          onClick={() => window.print()}
        >
          Save this strategy
        </button>
      </div>
    </main>
  );
}