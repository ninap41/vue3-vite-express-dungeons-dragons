import { ref, type Ref, computed } from "vue";

interface ModalToggles {
  id: String
  open: boolean
}

export  function useModals(modalIds: Array<String>) {
  modalIds = [
  "createSpell",
  "createItem",
	"createWeapon",

	"editSpell",
  "editItem",
  "editWeapon",

	"viewSpell",
  "viewItem",
  "viewWeapon",

	"deleteConfirmation", 
]

  const arrayModal: Ref<Array<ModalToggles>> = ref(new Array())



  const initStore: () => void = () => {
    for (var i = 0; i <= modalIds.length; i++) {
      arrayModal.value.push({id: `${modalIds[i]}`, open:  false}) 
    }
  };

  const isOpen = (id: string) => {
    return arrayModal.value.find((modal: ModalToggles ) =>  modal.id === id)?.open
  };

  const open = (id: string) => {
   arrayModal.value.find((modal: ModalToggles ) =>  modal.id === id )!.open  = true
    return true
  };

  const close = (id: string) => {
    return arrayModal.value .find((modal: ModalToggles ) =>  modal.id === id )!.open = false;
  };


  initStore()
  return {
    isOpen,
    open,
    close,
  };
}
