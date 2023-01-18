import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Form, Input, Select, Button, Divider } from 'antd'

import { addCharacter, updateCharacter } from '../../services/characters.mjs'

const CharacterForm = ({
  id = '',
  name = '',
  avatar = '',
  miniAvatar = '',
  about = '',
  gender = '',
  birth = '',
  homeworld = '',
  notificationFunction = () => {},
  handleClose = () => {},
  update = false,
  dbId = '',
}) => {
  const formik = useFormik({
    initialValues: {
      characterId: id,
      name: name,
      avatar: avatar,
      miniAvatar: miniAvatar,
      about: about,
      gender: gender,
      birth: birth,
      homeworld: homeworld
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (update) {
        updateCharacter(dbId, values)
           .then(() => notificationFunction('info', 'Personaje actualizado', 'Se ha actualizado la información del personaje exitosamente.'))
           .catch(() => notificationFunction('error', 'Error al actualizar', 'Se ha producido un error al actualizar la información del personaje.'))
      } else {
        addCharacter(values)
          .then(() => notificationFunction('success', 'Personaje agregado', 'El personaje ha sido agregado exitosamente.'))
          .catch(() => notificationFunction('error', 'Error al agregar', 'No se pudo agregar el personaje.'))
      }
      handleClose()
    },
  })

  return (
    <Form
      name="ModificarInfo"
      onFinish={formik.handleSubmit}
      initialValues={formik.values}
    >
      <Input addonBefore="ID" value={id} disabled/>
      <Divider>Información</Divider>
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{  required: true }]}
      >
        <Input onChange={(e) => formik.setFieldValue('name', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Avatar Imagen (URL)"
        name="avatar"
        rules={[{  required: true }]}
      >
        <Input onChange={(e) => formik.setFieldValue('avatar', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Mini Avatar Imagen (URL)"
        name="miniAvatar"
        rules={[{  required: true }]}
      >
        <Input onChange={(e) => formik.setFieldValue('miniAvatar', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="¿Quién es?"
        name="about"
      >
        <Input.TextArea allowClear onChange={(e) => formik.setFieldValue('about', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Género"
        name="gender"
        rules={[{  required: true }]}
      >
        <Select
          options={[
            { value: 'Male', label: 'Hombre' },
            { value: 'Female', label: 'Mujer' },
            { value: 'Other', label: 'Otro' },
          ]}
          onChange={(value) => formik.setFieldValue('gender', value)}
        />
      </Form.Item>
      <Form.Item
        label="Fecha de nacimiento"
        name="birth"
      >
        <Input onChange={(e) => formik.setFieldValue('birth', e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Planeta de origen"
        name="homeworld"
      >
        <Input onChange={(e) => formik.setFieldValue('homeworld', e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {update ? 'Actualizar Información' : 'Agregar Información'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CharacterForm
