import React, { useEffect, useRef } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';

import { AppLayout, LinkButton, FormField, Row, Checkbox, Readonly, Status, Label, Button, Dropdown, Multiselect } from "lib/components";
import { useAppRoutes } from "AppRoutes";
import { useMachine } from "./useMachine";
import { useProxies } from "Proxies/useProxies";
import { useChannels } from "Channels/useChannels";

import 'react-bootstrap-typeahead/css/Typeahead.css';

const defaultValues = {
  id: -1,
  machineName: '',
  isOnline: '',
  baseUrl: '',
  slowMotionFrom: '',
  slowMotionTo: '',
  degreeOfParallelism: '',
  nation: '',
  note: '',
  internalUse: null,
  botName: '',
  proxyId: '',
  channels: []
  // proxy: {
  //   id: -1,
  //   proxyName: '',
  //   nation: '',
  //   proxyServer: '',
  //   proxyUsername: '',
  //   proxyPassword: '',
  //   numOfRep: ''
  // },
  // channels: [
  //   {
  //     id: -1,
  //     channelName: '',
  //     channelDescription: '',
  //     active: '',
  //     numberOfRep: '',
  //     numberOfAds: '',
  //     adsPercentage: '',
  //     nation: "",
  //     keywordCategoryId: '',
  //     categoryName: '',
  //     browser: ''
  //   }
  // ]
}

const Machine = () => {
  let { id } = useParams();
  const { routes } = useAppRoutes();

  const typeaheadRef = useRef(null);
  const [data, isLoading] = useMachine(id);
  const { data: proxies } = useProxies();
  const { data: channels } = useChannels();

  const { control, setValue, register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: data || defaultValues });

  const onSubmit = data => {
    if (id) { // edit

    } else { // add

    }
  };

  useEffect(() => {
    async function setFormData() {
      const formData = { ...data, proxyId: data.proxy.id, /*channels: data.channels.map(c => { return c.id }) */ }
      reset(formData);
    }

    if (data) {
      setFormData();
    }
  }, [data, reset])

  return <AppLayout title="Edit machine">
    <Container>
      <Row>
        <Col>
          <LinkButton variant="secondary" to={routes.MACHINES.path}>
            Back to Machine List
          </LinkButton>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <h2>Machine details</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormField
              control={control}
              label="Machine name"
              error={errors.machineName?.message}
              name="machineName"
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Base URL"
              error={errors.baseUrl?.message}
              name="baseUrl"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormField
              control={control}
              label="Slow Motion From"
              error={errors.slowMotionFrom?.message}
              name="slowMotionFrom"
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Slow Motion To"
              error={errors.slowMotionFrom?.message}
              name="slowMotionTo"
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Degree of Parallelism"
              error={errors.degreeOfParallelism?.message}
              name="degreeOfParallelism"
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Nation"
              error={errors.nation?.message}
              name="nation"
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", alignItems: "center" }}>
            <FormField
              control={control}
              label="Internal Use"
              error={errors.internalUse?.message}
              name="internalUse"
              component={Checkbox}
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Note"
              error={errors.note?.message}
              name="note"
            />
          </Col>
          <Col>
            <FormField
              control={control}
              label="Bot Name"
              error={errors.botName?.message}
              name="botName"
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", alignItems: "flex-end" }}>
            <FormField
              control={control}
              label="Proxy"
              error={errors.proxyId?.message}
              name="proxyId"
              component={Dropdown}
              items={proxies}
              valueKey="id"
              nameKey="proxyName"
              placeholder="Select proxy"
            />
          </Col>
          <Col>
            {/* <FormField
              control={control}
              label="Channels"
              error={errors.channels?.message}
              name="channels"
              component={Multiselect}
              items={channels}
              valueKey="id"
              nameKey="channelName"
              placeholder="Select channel"
              register={register}
            // onChange={(a) => {
            //   console.log(a.target.value)
            //   setValue("channels", [...getValues("channels"), a.target.value])
            // }}
            /> */}

            {/* <Multiselect
              items={channels}
              valueKey="id"
              nameKey="channelName"
              placeholder="Select channel"
              register={register}
              label="Channels"
              name="channels"
              values={data?.channels?.map((m) => { return m.id })}
              // onChange={(e)=>{
              //   const val = e.target.value;

              // }}
              onChange={(e) => console.log(e)}
            /> */}

            {(!id || data) && channels && <FormField
              control={control}
              label="Channels"
              error={errors.channels?.message}
              name="channels"
              id="channels"
              component={Typeahead}
              options={channels}
              placeholder="Select channel"
              labelKey="channelName"
              defaultSelected={data ? [...data.channels] : []}
              multiple
              //ref={typeaheadRef}
              onChange={(selected) => {
                console.log(selected);
                //setSelected(selected);
                // Keep the menu open when making multiple selections.
                //typeaheadRef.current.toggleMenu();
              }}
            />
            }
            {/* <Typeahead
              multiple
              onChange={(selected) => {
                console.log(selected);
                //setSelected(selected);
                // Keep the menu open when making multiple selections.
                typeaheadRef.current.toggleMenu();
              }}
              options={channels}
              placeholder="Choose a channel..."
              ref={typeaheadRef}
              // selected={selected}
            /> */}
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit">Save</Button>
          </Col>
        </Row>

        {
          id && <>
            <Row>
              <Col>
                <h2>Proxy</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Readonly label="Proxy Name" value={data?.proxy.proxyName} />
              </Col>
              <Col>
                <Readonly label="Proxy Server" value={data?.proxy.proxyServer} />
              </Col>
              <Col>
                <Readonly label="Proxy Nation" value={data?.proxy.nation} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Readonly label="Proxy Username" value={data?.proxy.proxyUsername} />
              </Col>
              <Col>
                <Readonly label="Proxy Password" value={data?.proxy.proxyPassword} />
              </Col>
              <Col>
                <Readonly label="Number of rep" value={data?.proxy.numOfRep} />
              </Col>
            </Row>

            <Row>
              <Col>
                <h2>Channels</h2>
              </Col>
            </Row>
            {
              data?.channels?.map(c => {
                return <Row key={c.id}>
                  <Col>
                    <Readonly label="Channel Name" value={c.channelName} />
                  </Col>
                  <Col>
                    <Readonly label="Channel Description" value={c.channelDescription} />
                  </Col>
                  <Col>
                    <Label style={{ marginRight: "10px" }}>Active</Label>
                    <Status label="Active" active={c.active} />
                  </Col>
                </Row>
              })
            }
          </>
        }


      </form>
    </Container>
  </AppLayout>
};

export default Machine;