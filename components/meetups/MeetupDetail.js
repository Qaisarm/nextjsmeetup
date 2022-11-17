
import classes from './MeetupDetail.module.css'

import Image from "next/image";
function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
        <Image
        src={props.image}
        alt={props.title}
        width={300} height={350} />
        <h1> {props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;