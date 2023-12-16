declare type Readme = {
  title: string;
} & (
  | {
      content: string;
      link?: string;
    }
  | {
      list: {
        key: string;
        value: string | number;
      }[];
    }
);
