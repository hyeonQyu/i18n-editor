import { Checkable } from '@defines/checkable';
import { ChangeEventHandler, useEffect, useState } from 'react';

export interface IUseCheckableParams<T> {
  checkableItems: Checkable<T>[];
}

export interface IUseCheckable<T> {
  /** 체크할 아이템 목록 */
  items: Checkable<T>[];

  /** 체크된 아이템 타입 목록 */
  checkedItemTypes: T[];

  /** 전체 체크 여부 */
  isAllChecked: boolean;

  /** 필수값 미체크 여부 */
  isRequiredItemNotChecked: boolean;

  /** 체크된 항목 수 */
  checkedCount: number;

  /** 전체 체크 */
  handleCheckAll: ChangeEventHandler<HTMLInputElement>;

  /** 항목 체크 */
  handleCheck: ChangeEventHandler<HTMLInputElement>;
}

export default function useCheckable<T extends string>(params: IUseCheckableParams<T>): IUseCheckable<T> {
  const { checkableItems } = params;
  const [items, setItems] = useState<Checkable<T>[]>(checkableItems);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isRequiredItemNotChecked, setIsRequiredItemNotChecked] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    setItems(checkableItems);
  }, [checkableItems]);

  useEffect(() => {
    setIsAllChecked(items.every(({ checked }) => checked));
    setIsRequiredItemNotChecked(items.some(({ checked, required }) => required && !checked));
    setCheckedCount(items.filter(({ checked }) => checked).length);
  }, [items]);

  // 전체 선택
  const handleCheckAll: ChangeEventHandler<HTMLInputElement> = () => {
    setItems((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          checked: !isAllChecked,
        };
      });
    });
  };

  // 항목 하나 선택
  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentItem = e.target.value as T;
    setItems((prev) => {
      return prev.map((item) => {
        if (item.type === currentItem) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
    });
  };

  const checkedItemTypes = items.filter(({ checked }) => checked).map(({ type }) => type);

  return {
    items,
    checkedItemTypes,
    isAllChecked,
    isRequiredItemNotChecked,
    checkedCount,
    handleCheckAll,
    handleCheck,
  };
}
