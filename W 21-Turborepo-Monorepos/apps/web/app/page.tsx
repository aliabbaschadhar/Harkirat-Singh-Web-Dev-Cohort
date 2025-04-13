import { Button } from "@repo/ui/button";
import { TextIput } from "@repo/ui/text-input";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        fontFamily: "fantasy"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextIput placeholder="Add message here" />
        <Button appName="web" className={styles.secondary} >Send message</Button>
      </div>
    </div>
  );
}
