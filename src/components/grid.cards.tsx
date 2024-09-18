'use client'
import { useEffect } from 'react';
import MenuView from './menu.view';

interface IProps {
    iSelects: ISelections
    valueCheck: (value: ISelection) => number
}


function GridCard(props: IProps) {
    const { iSelects, valueCheck } = props

    useEffect(() => {
        refreshView()
    }, [iSelects])

    const handleCheck = (ck: boolean, cat: ISelection) => {
        cat.selected = ck
        valueCheck(cat)
    }

    function refreshView() {
        return <><MenuView iSelects={iSelects} valueCheck={valueCheck} handleCheck={handleCheck} /></>
    }

    return (
        <>
            {refreshView()}
        </>
    );
}

export default GridCard;