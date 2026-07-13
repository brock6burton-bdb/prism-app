interface ChoiceCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceCard({
  title,
  description,
  selected,
  onClick,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      className={`choiceCard${selected ? " choiceCardSelected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="choiceDot" aria-hidden="true" />
      <span className="choiceText">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  );
}
