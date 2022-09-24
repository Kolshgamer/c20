import {IconName} from "./names";

export type IconProps = {
  name: IconName;
  title?: string;
};

export default function Icon(props: IconProps) {
  return (
    <svg class="feather" aria-labelledby={props.title}>
      {props.title &&
        <title>{props.title}</title>
      }
      <use xlinkHref={`/assets/feather-sprite.svg#${props.name}`}/>
    </svg>
  );
}