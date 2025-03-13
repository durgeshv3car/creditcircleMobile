// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        clientData: null,
        vahicleData: null,
        selectedClient: null,
        selectedVehicle: null,
        selectedStartDate: moment().startOf('day').format('DD-MM-YYYY HH:mm'),
        selectedEndDate: moment().endOf('day').format('DD-MM-YYYY HH:mm'),
    },
    reducers: {
        setClientData: (state, action) => {
            const { payload } = action;
            state.clientData = payload.reduce((map, obj) => {
                map[obj.key] = obj;
                return map;
            }, {});
        },
        setVehicleData: (state, action) => {
            const { payload } = action;
            state.vahicleData = payload.reduce((map, obj) => {
                map[obj.key] = obj;
                return map;
            }, {});
        },
        selecteClient: (state, action) => {
            const { payload } = action;
            console.log("Setting client: ", payload);
            state.selectedClient = state.clientData[payload];
            state.selectedVehicle = null;
            state.vahicleData = {};
        },
        selecteVehicle: (state, action) => {
            const { payload } = action;
            console.log("Setting vehicle: ", payload);
            state.selectedVehicle = state.vahicleData[payload];
        },
        setStartDate: (state, action) => {
            const { payload } = action;
            console.log("Setting start date: ", payload);
            state.selectedStartDate = payload;
        },
        setEndDate: (state, action) => {
            const { payload } = action;
            console.log("Setting end date: ", payload);
            state.selectedEndDate = payload;
        }
    },
});

export const { setClientData, setVehicleData, selecteClient, selecteVehicle, setStartDate, setEndDate } = filterSlice.actions;

export default filterSlice.reducer;
