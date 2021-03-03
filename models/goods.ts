export interface Good {
  price: number;
  idCategory: number;
  count: number;
  id: number;
}

export interface Orders {
  [key: string]: number;
}

export interface GoodCategory {
  [key: string]: {
    name: string;
    goods: { [key: string]: {
      N: string;
      T: number | string;
    }};
  }
}
