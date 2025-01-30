const focusTextField = (textFieldElement: HTMLInputElement | HTMLTextAreaElement) => {
  textFieldElement.focus();
  const { length } = textFieldElement.value;
  textFieldElement.setSelectionRange(length, length);
};

const getNextRowFirstTextField = (tr: HTMLTableRowElement) => {
  const nextTr = tr.nextElementSibling;

  if (!nextTr) return null;

  const nextTrTds = Array.from(nextTr.children);

  const nextTd = nextTrTds.find((_td) => {
    const textarea = _td.querySelector('textarea');
    if (!textarea) return false;
    return !textarea.disabled;
  });

  if (!nextTd) {
    const _nextTd = nextTrTds.find((_td) => _td.querySelector('input'));
    return _nextTd?.querySelector('input');
  }

  return nextTd.querySelector('textarea');
};

const getCurrentRowNextTextField = (tds: Element[], columnIndex: number) => {
  const nextTextarea = tds[columnIndex + 1].querySelector('textarea');
  if (!nextTextarea || nextTextarea.disabled) return null;
  return nextTextarea;
};

const getNextTextField = (targetElement: Element) => {
  const td = targetElement.closest('td');
  const tr = targetElement.closest('tr');

  if (!td || !tr) return null;

  const tds = Array.from(tr.children);
  const columnIndex = tds.indexOf(td);

  const isLastIndex = columnIndex === tds.length - 1;

  return isLastIndex ? getNextRowFirstTextField(tr) : getCurrentRowNextTextField(tds, columnIndex);
};

const getCurrentTextField = (targetElement: Element) => {
  return targetElement.querySelector('textarea') ?? targetElement.querySelector('input');
};

export const focusNextTextFieldCell = (targetElement: Element) => {
  const nextTextField = getNextTextField(targetElement);

  if (!nextTextField) {
    getCurrentTextField(targetElement)?.blur();
    return;
  }

  focusTextField(nextTextField);
};
