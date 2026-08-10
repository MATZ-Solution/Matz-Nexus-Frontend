function Heading({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {action && (
        <button
          onClick={action}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View all
        </button>
      )}
    </div>
  );
}

export default Heading;