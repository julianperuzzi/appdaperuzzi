import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Importar iconos de Material
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importar iconos de FontAwesome
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, name, type, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  let IconComponent;

  // Seleccionar el componente de icono adecuado según el tipo
  switch (type) {
    case 'material':
      IconComponent = MaterialIcons;
      break;
    case 'font-awesome':
      IconComponent = FontAwesome;
      break;
    default:
      IconComponent = Ionicons;
  }

  return <IconComponent size={28} style={[{ marginBottom: -3 }, style]} name={name} {...rest} />;
}
