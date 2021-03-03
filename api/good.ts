import { $axios } from '~/utils/api'
import { Good, GoodCategory } from '~/models/goods'
// типы которые возвращает бекенд
interface GoodBackend {
  B: boolean;
  C: number;
  CV: null;
  G: number;
  P: number;
  Pl: null;
  T: number;
}
interface ResponseGoodsApi {
  Error: string;
  Id: number;
  Success: boolean;
  Value:{
    Goods: GoodBackend[];
  }
}
export const fetchGoodsApi = () => {
  const url = '/v0/b/cyprus-84040.appspot.com/o/data.json?alt=media&token=e6e089da-5828-472a-a5a0-e4faf36a958d'
  return new Promise<Array<Good>>((resolve, reject) => {
    $axios.$get(url)
      .then((data: ResponseGoodsApi) => {
        if (data.Success) {
          // преобразовываем названия сущностей
          // поскольку названия переменных не очень очевидно
          resolve(data.Value.Goods.map(good => ({
            price: good.C,
            idCategory: good.G,
            count: good.P,
            id: good.T
          })))
        } else {
          reject(data.Error)
        }
      })
      .catch(e => reject(e))
  })
}

interface GoodCategoryBackend {
  [key: string]: {
    G: string;
    B: { [key: string]: {
        N: string;
        T: number | string;
      }};
    C?: number;
  }
}

export const fetchGoodsCategoriesApi = () => {
  const url = '/v0/b/cyprus-84040.appspot.com/o/names.json?alt=media&token=2e65c567-821b-4a2c-8dac-f56fc759e411'
  return new Promise<GoodCategory>((resolve, reject) => {
    $axios.$get(url)
      .then((data: GoodCategoryBackend) => {
        const result = {} as GoodCategory
        for (const key in data) {
          result[key] = {
            name: data[key]?.G,
            goods: data[key]?.B
          }
        }
        resolve(result)
      })
      .catch(e => reject(e))
  })
}
