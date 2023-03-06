# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## Changed

- Upgraded SDK dependencies to v8
- Updated build.yml
- Updated package.json main, types, and files to work with updated build.yml
- Updated project [README.md](http://README.md '‌')
- Added jupiterone/questions/questions.yaml file
- Upgraded package.json scripts to match an `integration-template`
- Updated tests to use latest patterns

## 2.3.0 - 2022-12-02

### Added

- Assigned 'Device' class to the `trend_micro_computer` entity. As of now, the
  `trend_micro_computer` entity is classified as both 'Host' and 'Device'.

## 2.2.4 - 2022-11-23

### Changed

- Updated `node-fetch` and `@lifeomic/attempt` dependencies
- Updated package.json scripts

## 2.2.3

### Changed

- Updated `tsconfig.dist.json`

## 2.2.2

### Changed

- Updated build and publish workflow

## 2.2.1

### Added

Added the following properties to `trend_micro_computer`:

- ec2InstanceId
- cloudProvider
- awsAccountId
- agentStatus
- applianceStatus
- hostGUID
- agentGUID

## 2.2.0 - 2021-07-12

### Changed

- Upgrade `@jupiterone/integration-sdk-*@6.10.0`

## 0.1.0 - 2020-04-27

### Added

- Collection of relationships between Computers and Computer Groups
- Collection of relationships between Administrators and Roles
- Collection of Role entities
- Collection of Computer entities
- Collection of Computer Group entities
- Collection of API Key entities
- Collection of Administrator entities

### Changed

- `instanceConfigFields.json` now specifies an `apiKey` config field.
