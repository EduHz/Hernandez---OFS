export default function Message({ mensaje }) {
  return (
    <>
      {mensaje && (
        <div
          className={
            mensaje.includes("Information") ? "mensaje-error" : "mensaje"
          }
        >
          {mensaje}
        </div>
      )}
    </>
  );
}
