'use client'
import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Button, message, Alert } from 'antd';
import dayjs from 'dayjs'
import {
  Card,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Dialog, DialogPanel,
  Text,
  Title,
  AreaChart
} from "@tremor/react";
interface RecordParams {
  name: string;
  remark: string;
  phone: String;
}
export default function Home() {
  const [isOpen, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [waitingNumber, setWaitingNumber] = useState(null);
  const [todayWaitingNumber, setTodayWaitingNumber] = useState(null);
  const [waitingList, setWaitingList] = useState([]);
  const [notice, setNotice] = useState('');
  const [chartdata, setchartdata] = useState([{
    date: "08:00",
    "People": 16,
  },
  {
    date: "09:00",
    "People": 12,
  },
  {
    date: "10:00",
    "People": 15,
  },
  {
    date: "11:00",
    "People": 16,
  },
  {
    date: "12:00",
    "People": 15,
  },
  {
    date: "13:00",
    "People": 12,
  },
  {
    date: "14:00",
    "People": 16,
  },
  {
    date: "15:00",
    "People": 12,
  },
  {
    date: "16:00",
    "People": 13,
  },])
  useEffect(() => {
    refresh();
    getNotice();
  }, []);

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

  const sumbitRecord = ({ name, remark,phone }: RecordParams) => {
    fetch('/api/addRecord', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time,
        name,
        remark,
        extInfo:{phone}
      })
    }).then(res => res.json()).then(data => {
      if (data._id) {
        refresh();
        setOpen(false);
        message.success('Reservation successful');
      } else {
        alert('failed')
      }
    })
  }
  const getNotice = () => {
    fetch('/api/getNotice').then(res => res.json()).then(data => {
      setNotice(data.content);
    });
  }


  return (
    <main className="p-12">
      <Title>Restaurant</Title>
      <Text>Digital Reservation System</Text>
      <Alert className="mt-4 mb-4" message={notice} banner />
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <div className="h-28" >
                  <span>Total Waiting People</span>
                  <div className="mt-5"><span className="text-4xl">
                    {waitingNumber !== null ? waitingNumber : '--'}</span></div>
                </div>
              </Card>
              <Card>
                <div className="h-28" >
                  Today&apos;s Waiting People
                  <div className="mt-5"><span className="text-4xl">
                    {todayWaitingNumber !== null ? todayWaitingNumber : '--'}</span>
                  </div>

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
            <div className="mt-6">
              <Card>
                <Title>Real-time people flow</Title>
                <div >
                  <AreaChart
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["People"]}
                    colors={["blue"]}
                    yAxisWidth={30}
                  />
                </div>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="" >
                  {waitingList.map((item, index) => {
                    return <div key={index} className="flex justify-between items-center">
                    <span>{(item as any).name?.slice(0, 2) + '***'}</span>
                    <span>{new Date((item as any).time).toLocaleString()}</span>
                  </div>
                  })}
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div className="fixed bottom-0 left-0 p-8 text-center w-full">
        <Button type="primary" className="bg-blue-700" onClick={() => { setOpen(true) }}>Make an Appointment Now</Button>
      </div>
      <Dialog open={isOpen} onClose={() => { setOpen(false) }}>
        <DialogPanel>
          <Title className="mb-5">Fill out your information</Title>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={sumbitRecord}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Remark" name="remark">
              <Input.TextArea rows={3} placeholder=""></Input.TextArea>
            </Form.Item>
            <Form.Item label="Time" name="time">
              <DatePicker minDate={dayjs()} showTime onChange={(date) => { setTime(date.valueOf()); }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button className="bg-blue-700" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </DialogPanel>
      </Dialog>
    </main>
  )
}
