import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/side/ensar.png"
          alt="Image showing Ensar"
          width={300}
          height={300}
        ></Image>
      </div>
      <h1>Hi, I am Ensar</h1>
      <p>
        I blog about web development, especially frontend frameworks like React
        and Next
      </p>
    </section>
  );
}

export default Hero;
