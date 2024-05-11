/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalCloseButton, ModalContent, ModalHeader, ModalProps, ModalRoot, openModal } from "@utils/modal";
import { Forms, React, Text } from "@webpack/common";

export function openPluginModal(plugin) {
    openModal((props: ModalProps) => (
        <ModalRoot {...props}>
            <ModalHeader separator={false}>
                <Text variant="heading-lg/semibold" style={{ flexGrow: 1 }}>{plugin.name}</Text>
                <ModalCloseButton onClick={props.onClose} />
            </ModalHeader>
            <ModalContent>
                <Forms.FormSection>
                    <Forms.FormTitle tag="h3">About {plugin.name}</Forms.FormTitle>
                    <Forms.FormText>{plugin.description}</Forms.FormText>
                </Forms.FormSection>
            </ModalContent>
        </ModalRoot>
    ));
}
