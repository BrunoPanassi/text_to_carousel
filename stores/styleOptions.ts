import { defineStore } from 'pinia'

export const useStyleOptionsStore = defineStore('styleOptions', {
    state: () => ({
        backgroundColor: "",
        lastBackgroundColor: ""
    }),
    getters: {
        getBackgroundColor: (state) => state.backgroundColor,
        getLastBackgroundColor: (state) => state.lastBackgroundColor
    },
    actions: {
        setBackgroundColor(color: string) {
            this.backgroundColor = color
        },
        setBackgroundColorOfLastBackgroundColor() {
            this.backgroundColor = this.lastBackgroundColor;
        },
        updateLastBackgroundColor() {
            this.lastBackgroundColor = this.backgroundColor;
        }
    }
})