<?php
defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage('local_gitacademy', get_string('pluginname', 'local_gitacademy', 'Git Academy Integration'));
    $ADMIN->add('localplugins', $settings);

    $settings->add(new admin_setting_configtext(
        'local_gitacademy/playground_url',
        'Git Playground URL',
        'URL to embedded Git Playground service',
        'http://localhost:3000',
        PARAM_URL
    ));
}
