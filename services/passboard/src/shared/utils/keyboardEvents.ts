export const keyboardEvents = (e: React.KeyboardEvent<HTMLInputElement>) => {
  return {
    // NOTES: IME 입력 시 발생하는 이벤트
    isComposing: e.nativeEvent.isComposing,
    isEnter: e.key === 'Enter' || e.key === 'NumpadEnter',
    isEscape: e.key === 'Escape',
    isTab: e.key === 'Tab',
    isBackspace: e.key === 'Backspace',
    isDelete: e.key === 'Delete'
  }
}
