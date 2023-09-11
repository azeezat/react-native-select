import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  Image,
  ViewStyle,
} from 'react-native';
import { colors } from '../../styles/colors';

export const ListEmptyComponent = ({
  listEmptyComponentStyle,
  emptyListMessage,
}: any) => {
  return (
    <View style={styles.listEmptyComponentStyle}>
      <Text style={listEmptyComponentStyle}>
        {emptyListMessage || 'No options available'}
      </Text>
    </View>
  );
};

export const ItemSeparatorComponent = ({ itemSeparatorStyle }: any) => {
  return <View style={[styles.itemSeparatorStyle, itemSeparatorStyle]} />;
};

export const ListItemContainer = ({
  children,
  listItemContainerStyle,
}: {
  children: ReactNode;
  listItemContainerStyle: ViewStyle;
}) => {
  return (
    <View style={[styles.listItemContainerStyle, listItemContainerStyle]}>
      {children}
    </View>
  );
};

export const SectionHeaderTitle = ({
  title,
  sectionHeaderStyle,
  onPress,
  isExpanded,
}: {
  title: string;
  sectionHeaderStyle?: TextStyle;
  onPress?: () => void;
  isExpanded: Boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ListItemContainer listItemContainerStyle={styles.accordionStyle}>
        <Text style={[styles.sectionHeaderStyle, sectionHeaderStyle]}>
          {title}
        </Text>
        <View style={isExpanded ? null : styles.rotatedIcon90}>
          <Image source={require('../../asset/arrow-down.png')} />
        </View>
      </ListItemContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listEmptyComponentStyle: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  itemSeparatorStyle: {
    backgroundColor: colors.gray,
    height: 1,
    opacity: 0.15,
  },
  listItemContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderStyle: { fontWeight: '500' },
  accordionStyle: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  rotatedIcon90: {
    transform: [{ rotate: '-90deg' }],
  },
});
