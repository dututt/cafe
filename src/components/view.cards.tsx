'use client'
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import OrderView from './order.view';

interface IProps {
    viewSelects: ISelections
    handleValueCheck: (value: ISelection) => number
    setAcceptStatus: (value: boolean) => void
}

function ViewCard(props: IProps) {
    const { viewSelects, handleValueCheck, setAcceptStatus } = props

    const [status, setStatus] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [changeTextStatus, setChangeTextStatus] = useState<string>('')

    const pathname = usePathname()
    const searchParams = useSearchParams();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const fullUrl = `${window.location.origin}${pathname}${searchParams && searchParams.toString() ? '?' + searchParams.toString() : ''}${hash}`;
    let tableNum = fullUrl.split("#")[1]


    function handleChangeTextStatus() {
        setChangeTextStatus('Đang tiếp nhận...')
    }

    const selects = viewSelects.selections.filter(item => item.selected === true)
    useEffect(() => {
        refreshView()
        TotalBill()
    }, [selects])

    function handleAcceptView(): void {
        setStatus(true)
        setAcceptStatus(true)
        handleChangeTextStatus()

        let numTable = !tableNum ? 0 : Number.parseInt(tableNum)
        const status = "Accepted"

        fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numTable, total, selects, status })
        }).then(res => {
            return res.json()
        })
            .then(res => {
                if (res) {
                    toast.success("Create new order succeed !")
                    console.log(">>>>>>>>>>>>>>>Create new order succeed")
                }
            })
    }

    function TotalBill() {
        let total: number = 0
        selects.map((item) => {
            total += Number.parseInt(item.item.price_order?.toString())
        })
        setTotal(total)
    }

    function deSelect(value: ISelection) {
        const find = selects.filter(item => item.item.id === value.item.id)
        if (find) {
            find[0].selected = false;
            let index: number = selects.indexOf(find[0])
            selects.splice(index, 1)
        }
        handleValueCheck(value)
    }

    function refreshView() {
        return (<><OrderView selects={selects} status={status} TotalBill={TotalBill} deSelect={deSelect} changeTextStatus={changeTextStatus} total={total} handleAcceptView={handleAcceptView} /></>)
    }

    return (
        <>
            {refreshView()}
        </>
    );
}

export default ViewCard;

