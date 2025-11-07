import { CircularProgress } from "@mui/material";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({ inverted = true, content = "Loading..." }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        backgroundColor: inverted ? "rgba(255, 255, 255, 0.8)" : "transparent",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
        <h3 style={{ marginTop: "1rem", color: "#555" }}>{content}</h3>
      </div>
    </div>
  );
}
