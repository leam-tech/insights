import frappe


@frappe.whitelist()
def widget_value_update(*args, **kwargs):
    """
    Widgets we expect to see in the request:
    1. Binary
    2. TkButton
    3. TkServo
    4. TkMotor

    1. Binary
    => {type: str, binary_value: bool, timestamp: str}

    2. TkButton
    => {type: str, button_value: bool, timestamp: str}

    3. TkServo
    => {type: str, angle: int, timestamp: str, max_angle: int}

    4. TkMotor
    => {type: str, speed: int, timestamp: str, max_speed: int}

    """
    valid_types = ("Binary", "TkButton", "TkServo", "TkMotor")

    if kwargs.get("type") not in valid_types:
        frappe.throw("Invalid type")

    for hook in frappe.get_hooks("insights_widget_update", default=[]):
        frappe.get_attr(hook)(**kwargs)
