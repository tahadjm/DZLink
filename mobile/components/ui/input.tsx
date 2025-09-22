import { THEME } from "@/libs/constants";
import { cn } from "@/libs/utils";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC, useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface InputProps {
  label?: string;
  control: any;
  name: string;

  iconPosition?: "right" | "left";
  iconName?: keyof typeof Icon.glyphMap;

  error?: string | null;
  password?: boolean;
  phone?: boolean;

  disabled?: boolean;
  disabledBg?: boolean;
  multiline?: boolean;

  onFocus?: () => void;
  onIconClick?: () => void;

  loading?: boolean;
  children?: React.ReactNode;

  valueExtractor?: (value: any) => string;
  [key: string]: any;
}

export const Input: FC<InputProps> = ({
  control,
  name,
  label,
  iconName,
  iconPosition = "left",
  password,
  phone,
  disabled = false,
  disabledBg = false,
  multiline = false,
  onFocus = () => {},
  onIconClick = () => {},
  loading = false,
  children,
  valueExtractor,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: RFValue(12),
    color: "black",
    textAlign: "left",
    paddingVertical: RFValue(0),
  };

  const inputMultilineStyle: TextStyle = {
    flex: 1,
    fontSize: RFValue(12),
    color: "black",
    textAlign: "left",
    paddingVertical: RFValue(10),
    alignSelf: "flex-start",
  };

  const containerStyle: ViewStyle = {
    minHeight: RFValue(multiline ? 70 : 40),
    backgroundColor: disabledBg ? "#F6F6F6" : THEME.theme.background,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: RFValue(8),
    flexDirection: "row",
    alignItems: "center",
  };

  const errorStyle: TextStyle = {
    fontSize: RFValue(10),
    color: "red",
    marginTop: RFValue(6),
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const displayValue = valueExtractor ? valueExtractor(value) : value;

        return (
          <View>
            {label && (
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontWeight: "500",
                  color: "#555555",
                  marginBottom: RFValue(6),
                }}
              >
                {label}
              </Text>
            )}

            <View
              className={cn("border", error && "border-destructive")}
              style={containerStyle}
            >
              {phone && (
                <Text
                  style={{
                    color: "black",
                    fontSize: RFValue(12),
                    marginRight: RFValue(4),
                  }}
                >
                  +213
                </Text>
              )}

              {iconPosition === "left" && iconName && (
                <Icon
                  onPress={onIconClick}
                  style={{
                    fontSize: RFValue(16),
                    color: "#8D8E90",
                    marginRight: RFValue(8),
                  }}
                  name={iconName}
                />
              )}

              <TextInput
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                secureTextEntry={!!password && hidePassword}
                autoCorrect={false}
                selectionColor={THEME.theme.primary}
                returnKeyType={props.returnKeyType || "done"}
                value={displayValue ?? ""}
                onChangeText={(text) => {
                  console.log("📝 Input changed:", text);
                  onChange(text); // always forward plain string
                }}
                onBlur={onBlur}
                onFocus={onFocus}
                style={multiline ? inputMultilineStyle : inputStyle}
                {...props}
                editable={!disabled}
                contextMenuHidden={disabled}
                keyboardType="default"
              />

              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#8D8E90"
                  style={{ marginLeft: RFValue(8) }}
                />
              )}

              {iconPosition === "right" && iconName && (
                <Icon
                  onPress={onIconClick}
                  style={{
                    fontSize: RFValue(16),
                    color: "#8D8E90",
                    marginLeft: RFValue(8),
                  }}
                  name={iconName}
                />
              )}

              {password && (
                <Icon
                  style={{
                    fontSize: RFValue(18),
                    color: "#8D8E90",
                    marginLeft: RFValue(8),
                  }}
                  onPress={() => setHidePassword((prev) => !prev)}
                  name={hidePassword ? "eye-outline" : "eye-off-outline"}
                />
              )}

              {children}
            </View>

            {error && <Text style={errorStyle}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
};
