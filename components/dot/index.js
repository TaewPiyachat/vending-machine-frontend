const Dot = ({ color }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
      }}
    />
  );
};

export default Dot;