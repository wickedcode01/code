'use client'
import { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Dialog, DialogPanel,
    Button,
    Text,
    Title,
    TextInput
} from "@tremor/react";
import { message, Alert, } from 'antd';

export default function Test() {
    const [notice, setNotice] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newNotice, setNewNotice] = useState('');
    const [waitingNumber, setWaitingNumber] = useState(null);
    const [todayWaitingNumber, setTodayWaitingNumber] = useState(null);
    const [waitingList, setWaitingList] = useState([]);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (!token) {
            window.location.href = '/admin/login';
        } else {
            refresh()
        }
        getNotice();
    }, []);

    const finishRecord = (id: string) => {
        fetch('/api/finishRecord', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            refresh();
            message.success('finish success');
        })
    }

    const refresh = () => {
        fetch('/api/countRecord').then(res => res.json()).then(data => {
            setWaitingNumber(data.count);
        });
        fetch('/api/countRecord?date=' + new Date().valueOf()).then(res => res.json()).then(data => {
            setTodayWaitingNumber(data.count);
        });
        fetch('/api/findRecord').then(res => res.json()).then(data => {
            setWaitingList(data);
        })
    }

    const getNotice = () => {
        fetch('/api/getNotice').then(res => res.json()).then(data => {
            setNotice(data.content);
        });
    }

    const addNotice = () => {
        fetch('/api/addNotice', {
            method: 'POST',
            body: JSON.stringify({ content: newNotice }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            message.success('update success');
            setNotice(newNotice);
            setIsDialogOpen(false);
        })
    }


    return (
        <div className="p-12">
            <Title>Admin Page</Title>
            <Text>Digital reservation system</Text>
            <Alert className="mt-4 mb-4" message={notice} banner />
            <Button onClick={() => setIsDialogOpen(true)}>Modify Notice</Button>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogPanel>
                    <TextInput value={newNotice} onChange={(e) => setNewNotice(e.target.value)} placeholder="Enter new notice" />
                    <Button onClick={addNotice}>Submit</Button>
                </DialogPanel>
            </Dialog>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                <Card>
                    <div className="h-28 " >
                        <span>Total Waiting People</span>
                        <div className="mt-5"><span className="text-4xl">{waitingNumber !== null ? waitingNumber : '--'}</span></div>
                    </div>
                </Card>
                <Card>
                    <div className="h-28" >
                        Today&apos;s Waiting People
                        <div className="mt-5"><span className="text-4xl">{todayWaitingNumber !== null ? todayWaitingNumber : '--'}</span></div>
                    </div>
                </Card>
                <Card>
                    <div className="h-28" >
                        Estimate Waiting Time
                        <div className="mt-5">
                            <span className="text-4xl">
                                {todayWaitingNumber !== null ? (todayWaitingNumber * 0.5) + 'h' : '--'}</span>
                        </div>
                    </div>
                </Card>
            </Grid>
            <Card className="mt-6">
                {waitingList.map((item: { name: string, extInfo?: { phone: string }, remark: string, time: string, _id: string }, index) => {
                    return <div className="flex justify-between items-center m-1" key={item._id}>
                        <span>Name: {item.name}</span>
                        <span>Phone: {item?.extInfo?.phone}</span>
                        <span>Remark: {item.remark}</span>
                        <span>{new Date(item.time).toLocaleString()}</span>
                        <Button onClick={() => finishRecord(item._id)}>finish</Button>
                    </div>
                })}
            </Card>
        </div>
    )
}