import { ref } from "vue";

export  function useModals(modalIds: Array<String>) {
  const dictionary: any = {};
  const initDictionary: any = () => {
    for (var i = 0; i <= modalIds.length; i++) {
      dictionary[`${modalIds[i]}`] = ref(false)
    }
  };

  initDictionary()
  const isOpen = (id: string) => {
    return dictionary[`${id}`].value
  };

  const open = (id: string) => {
    dictionary[`${id}`].value = true;
  };

  const close = (id: string) => {
    dictionary[`${id}`].value= false;
  };

  

  return {
    isOpen,
    open,
    close,
  };
}
