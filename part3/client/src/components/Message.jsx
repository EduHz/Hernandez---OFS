export default function Message({ mensaje }) {
  return (
    <>
      {mensaje && (
        <div
          className={
            mensaje.includes("Added") ? "mensaje" : "mensaje-error"
          }
        >
          {mensaje}
        </div>
      )}
    </>
  );
}
