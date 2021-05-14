interface Data {
  icon: string;
  description: string;
}

const data: Data[] = [
  {
    icon: "^",
    description: "Rotate tetromino",
  },
  {
    icon: ">",
    description: "Move left one square",
  },
  {
    icon: ">",
    description: "Move right one square",
  },
  {
    icon: "|",
    description: "Move tetromino down",
  },
  {
    icon: "space",
    description: "Drop tetromino",
  },
  {
    icon: "enter",
    description: "Pause/Resume the game",
  },
];

export const Legend: React.FC<{}> = () => {
  return (
    <div
      className="d-none d-lg-block bg-light mx-auto p-3"
      style={{ maxWidth: "20rem" }}
    >
      <ul>
        {data.map(({ icon, description }, idx) => (
          <li key={idx}>
            <span className="d-block mr-2">{icon}</span>
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
