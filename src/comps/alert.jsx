function Alert({ type, title, text, delAlert }) {
  return (
    <div className={`alert alert-${type}`} role="alert" onClick={delAlert}>
      <h4 className="alert-title">{title}</h4>
      <div className="text-muted">{text}</div>
    </div>
  );
}

export function AlertContainer({ alerts }) {
  return (
    <div className="alerts">
      <div className="alert-container">
        {alerts.map((alert) => (
          <Alert key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
}
